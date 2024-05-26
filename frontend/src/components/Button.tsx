
interface signUpBtn {
    label: string,
    onClickCb : ()=>void
}
export function Button({label, onClickCb}:signUpBtn) {
    return (
        <div className="ml-4 mr-4">
            <button className="w-full bg-black text-white text-small rounded-md p-2" onClick={onClickCb}>{label}</button>
        </div>
    )
}