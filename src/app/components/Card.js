export default function Card(props) {

  return (
    <div className="w-full h-full rounded-3xl md:rounded-tl-md md:rounded-tr-full md:rounded-br-full md:rounded-bl-md bg-slate-100 p-4">
      {props.children}
    </div>
  )
}