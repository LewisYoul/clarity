export default function Card(props) {

  return (
    <div className="w-full h-full border rounded-md border border-1 border-slate-200 bg-slate-100 p-4">
      {props.children}
    </div>
  )
}