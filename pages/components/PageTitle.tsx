interface PageTitleProps {
    title: string
}

const PageTitle = ({title}:PageTitleProps) => {
    return (
        <div className="flex">
            <div className="p-2 rounded bg-base-100 shadow drop-shadow">
                <h1 className="text-lg font-bold">{title}</h1>
            </div>
        </div>
    );
}
 
export default PageTitle;