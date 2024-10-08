"use client";

import Card from "../Card";
import QrCodeForm from "./QrCodeForm";

export default function QrCodeGenerator() {  
  return(
    <Card>
      <QrCodeForm permitDynamic />
    </Card>
  )
}