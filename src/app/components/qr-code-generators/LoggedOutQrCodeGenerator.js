"use client";

import Card from "../Card";
import { useState } from "react";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import QrCodeForm from "./QrCodeForm";

export default function QrCodeGenerator() {

  return(
    <div className="w-full h-full rounded-3xl md:rounded-tl-md md:rounded-tr-[248px] md:rounded-br-3xl md:rounded-bl-md bg-slate-200 p-4">
      <QrCodeForm permitDynamic={false} />
    </div>

  )
}