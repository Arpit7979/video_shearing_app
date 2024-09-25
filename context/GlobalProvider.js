import {useState, createContext, useContext, useEffect} from 'react'
import {getCurrentUser} from '../lib/appwrite'

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getCurrentUser().then((user)=>{
            if(user){
                setUser(user);
                setIsLogedIn(true);
            }else{
                setUser(null);
                setIsLogedIn(false);
            }
            
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setIsLoading(false);
        });
    },[]);


    return (
        <GlobalContext.Provider
        value={{
            isLogedIn,
            user,
            isLoading,
            setUser,
            setIsLogedIn
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;

