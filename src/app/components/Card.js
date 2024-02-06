export default function Card(props) {

  return (
    <div className="w-full h-full rounded-3xl md:rounded-tl-md md:rounded-tr-[248px] md:rounded-br-3xl md:rounded-bl-md bg-slate-200 p-4">
      {props.children}
    </div>
  )
}