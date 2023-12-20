export default function Card(props) {

  return (
    <div className="w-full h-full rounded-md bg-slate-100 p-4">
      {props.children}
    </div>
  )
}