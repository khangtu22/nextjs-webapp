import Login from "../components/auths/Login";
import ClientOnly from "../components/ClientOnly";

export default function LoginPage() {
    return (
        <ClientOnly>
            <Login/>
        </ClientOnly>
    );
}
