import { useNavigate } from "react-router-dom";


const Navigate = () => {
    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    }
    return { navigateTo}
}

export default Navigate


