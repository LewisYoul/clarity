export default function Card(props) {

  return (
    <div className="w-full border rounded-md border border-2 border-slate-400 bg-slate-100 p-2">
      {props.children}
    </div>
  )
}