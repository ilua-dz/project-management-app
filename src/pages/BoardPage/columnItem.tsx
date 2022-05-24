import { IColumn } from "../../API/columns";

interface IColumnProps{
  data: IColumn
}

function ColumnItem(props: IColumnProps){
  return <div>{props.data.title}</div>
}

export default ColumnItem