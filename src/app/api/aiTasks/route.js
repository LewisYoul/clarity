import { NextResponse } from 'next/server';
import { authorizeRequest } from '@/app/utils/sessionUtils';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import prisma from '../../utils/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get the form data from the request
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Convert the audio file to a buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    console.log('BUFFAH', buffer)

    const tempFilePath = path.join('/tmp', `audio-${Date.now()}.webm`);
    
    // Write buffer to temporary file
    fs.writeFileSync(tempFilePath, buffer);
    
    // Create transcription using OpenAI SDK
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: 'whisper-1',
    });

    // Clean up: delete the temporary file
    fs.unlinkSync(tempFilePath);

    console.log('TRANSCRIPTION', transcription)

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": `
                Your task is to convert the user's input (which has been transcribed from an audio file)
                into a text string.
                The text should be in the format of a short task that can be completed.
                Do not add a full stop to the end of the text.
                If the user's input starts with "I had a task" then you should assume that the user means "Add a task".
              `
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": 'Add a task to recharge the battery on my moped.'
            }
          ]
        },
        {
          "role": "assistant",
          "content": [{ "type": "text", "text": "Recharge the battery on my moped" }]
        },
        {
          "role": "user",
          "content": [
            { "type": "text", "text": "I had a task to buy milk." }
          ]
        },
        {
          "role": "assistant",
          "content": [{ "type": "text", "text": "Buy milk" }]
        },
        {
          "role": "user",
          "content": [
            { "type": "text", "text": transcription.text }
          ]
        }
      ]
    });

    console.log('completion', completion.choices[0].message.content)
        
    try {
      const task = await prisma.Task.create({
        data: {
          teamId: currentTeam.id,
          userId: currentUser.id,
          title: completion.choices[0].message.content,
        }
      })
  
      console.log('TASK', task)
  
      return Response.json({ message: 'Task created', data: task })
    } catch(error) {
      return Response.json({ message: 'Internal Server Error' }, { status: 500 })
    }

  } catch (error) {
    console.error('Error processing audio:', error);
    return NextResponse.json(
      { error: 'Error processing audio file' },
      { status: 500 }
    );
  }
}
