import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const UserContext = React.createContext();

axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

    const [isAuth, setIsAuth] = useState(() =>
        typeof window !== 'undefined' && window.localStorage.getItem('auth') === 'true'
    );

    const [user, setUser] = useState({});
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Vérification si l'utilisateur est connecté lors du rechargement de la page
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCred) => {
            if (userCred) {
                // Utilisateur connecté, récupérer le token et les détails de l'utilisateur
                userCred.getIdToken().then((token) => {
                    setToken(token);
                    window.localStorage.setItem('auth', 'true');
                    setIsAuth(true);
                    getUser(userCred.uid, token);
                });
            } else {
                // Utilisateur déconnecté, réinitialiser l'état
                setIsAuth(false);
                setToken('');
                setUser({});
                window.localStorage.removeItem('auth');
                router.push('/login');
            }
        });

        return () => unsubscribe(); // Clean up on component unmount
    }, []);

    /************************************************* */
    /*********************Get user********************* */
    const getUser = async (uid, token) => {
        setLoading(true);
        try {
            const res = await axios.get(`${serverUrl}/api/auth/${uid}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            });
            setUser(prevState => ({
                ...prevState,
                ...res.data,
            }));
            setLoading(false);
        } catch (error) {
            console.log("Error getting user details", error);
            setLoading(false);
            toast.error(error.response);
        }
    };

    /************************************************* */
    /*********************REGISTER******************** */
    const registerUser = async (e) => {
        e.preventDefault();
        if (!userState.email.includes("@") || !userState.password || userState.password.length < 6) {
            toast.error("Please enter a valid email and password (min 6 characters).");
            return;
        }
        try {
            const res = await axios.post(`${serverUrl}/api/auth/signup`, userState);
            console.log("user registered successfully", res.data);
            toast.success("User registered successfully.");

            //clear the form 
            setUserState({ name: "", email: "", password: "" });
            //redirect to login page
            router.push("/login");
        } catch (error) {
            console.log("Error registering user, ", error);
            toast.error(error.response.data.message);
        }
    };

    /************************************************* */
    /***********Login User With Google**************** */
    const loginUserWithGoogle = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                setIsAuth(true);
                window.localStorage.setItem('auth', 'true');
                toast.success("User logged in successfully");
                setToken(result.user.accessToken);
                await getUser(result.user.uid, result.user.accessToken);
                router.push('/');
            })
            .catch((error) => {
                console.error('Login failed:', error);
                toast.error(error.response.data.message);
            });
    };

    /************************************************* */
    /*********************Log Out********************* */
    const logOutUser = async () => {
        signOut(auth)
            .then(() => {
                setIsAuth(false);
                setToken('');
                setUser({});
                window.localStorage.removeItem('auth');
                router.push('/login');
            })
            .catch((error) => {
                console.error('Logout failed:', error);
                toast.error(error.response.data.message);
            });
    };

    /************************************************* */
    /************Dynamic form handler***************** */
    const handlerUserInput = (name) => (e) => {
        const value = e.target.value;
        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /************************************************* */
    /************get user Looged in Status************ */
    const userLoginStatus = async () => {
        let loggedIn = false;
        console.log(token);
        try {
            const res = await axios.get(`${serverUrl}/api/auth/login/status`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // coerce the string to boolean
            loggedIn = !!res.data;
            setLoading(false);

            if (!loggedIn) {
                router.push("/login");
            }
        } catch (error) {
            console.log("Error getting user login status", error);
        }
        return loggedIn;
    };

    /************************************************* */
    /*******************User login******************** */
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${serverUrl}/api/auth/login`, userState);
            setIsAuth(true);
            window.localStorage.setItem('auth', 'true');
            router.push('/');
            setToken(res.data.token);
            setUser(res);
            toast.success("Connexion réussie !");
            setUserState({
                email: "",
                password: ""
            });
            router.push("/");
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            toast.error(error.message);
        }
    };

    /************************************************* */
    /*********************Change Password************** */
    const changePassword = async (oldPassword, newPassword) => {
        setLoading(true);
        if (!oldPassword || !newPassword || newPassword.length < 6) {
            toast.error("Veuillez entrer un ancien mot de passe valide et un nouveau mot de passe de minimum 6 caractères.");
            setLoading(false);
            return;
        }
        try {
            const res = await axios.put(`${serverUrl}/api/auth/change-password`, { oldPassword, newPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                console.log(res.data);
                toast.success("Mot de passe changé avec succès.");
                setUserState({ ...userState, password: newPassword }); // Optionnel : mettre à jour l'état local du mot de passe
            } else {
                toast.error(res.data.message);
            }
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors du changement de mot de passe :", error);
            toast.error(error.response ? error.response.data.message : "Une erreur est survenue");
            setLoading(false);
        }
    };

    const updateProfileName = async (newName) => {
        if (!newName || newName.trim() === "") {
            toast.error("Le nouveau nom est requis.");
            return;
        }
        console.log(newName);
        try {
            const res = await axios.put(
                `${serverUrl}/api/auth/update-name`,
                { newName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data && res.data.user) {
                setUser((prevUser) => ({
                    ...prevUser,
                    ...res.data.user,
                }));
                toast.success("Nom mis à jour avec succès.");
            } else {
                toast.error("Une erreur s'est produite.");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du nom :", error);
            toast.error(error.response?.data?.message || "Erreur serveur.");
        }
    };

    return (
        <UserContext.Provider value={{
            registerUser,
            userState,
            handlerUserInput,
            userLoginStatus,
            user,
            loginUserWithGoogle,
            token,
            logOutUser,
            loginUser, changePassword,
            updateProfileName
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
