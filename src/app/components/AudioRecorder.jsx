import { useState, useRef, useEffect } from "react";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

const AudioRecorder = ({ className, onCreate }) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  console.log('permission', permission)

  useEffect(() => {
    const checkPermission = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })
      console.log('stream', stream)

      if (stream) {
        setPermission(true);
        setStream(stream);
      }
    }

    checkPermission()
  }, [])

  const getMicrophonePermission = async () => {
      if ("MediaRecorder" in window) {
          try {
              const streamData = await navigator.mediaDevices.getUserMedia({
                  audio: true,
                  video: false,
              });
              setPermission(true);
              setStream(streamData);
          } catch (err) {
              alert(err.message);
          }
      } else {
          alert("The MediaRecorder API is not supported in your browser.");
      }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    console.log('streaMonClick', stream)
    const media = new MediaRecorder(stream, { type: "audio/webm" });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);

      // Send audio to server
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      try {
        const response = await fetch('/api/aiTasks', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to send audio');
        }
        
        const data = await response.json();
        console.log('Server response:', data);

        onCreate()
      } catch (error) {
        console.error('Error sending audio:', error);
      }
    };
  };

  const handleButtonClick = async () => {
    if (!permission) {
      await getMicrophonePermission();
      return;
    }
    
    if (recordingStatus === "inactive") {
      startRecording();
    } else if (recordingStatus === "recording") {
      stopRecording();
    }
  }

  const colorClasses = recordingStatus === "recording" ? 'bg-green-500' : 'bg-blue-500'

  return (
    <>
      <button onClick={handleButtonClick} type="button" className={`${className} ${colorClasses} rounded-full p-1 h-7 w-7`}>
        <MicrophoneIcon className="h-5 w-5 text-white"/>
      </button>
      {/* {audio && (
        <audio controls>
          <source src={audio} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      )} */}
    </>
  );
};
export default AudioRecorder;