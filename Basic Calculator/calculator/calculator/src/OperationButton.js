import { Actions } from "./App"

export default function OpeartionButton({ dispatch, operation }) {
    return (<button onClick={() => dispatch(
        {
            type: Actions.Opeartion,load: {operation}
        })
    }>{operation}</button>
)
}