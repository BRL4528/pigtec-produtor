import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';

import {
  storageAuthTokenSaVe,
  storageAuthTokenGet,
  storageTokenRemove,
} from '@storage/storageAuthToken';
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from '@storage/storageUser';

export type AuthContextDataProps = {
  user: UserDTO;
  signInUser: (cpf: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setisLoadingUserStorageData] =
    useState(true);

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try {

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(userData);
    } catch (e) {
      throw e;
    }
  }

  async function signInUser(cpf: string) {
    try {
      const { data } = await api.post('/sessions-producers', { cpf });
      console.log('data', data)
      if (data.producer && data.token) {
        setisLoadingUserStorageData(true);
        await storageUserSave(data.producer);
        await storageAuthTokenSaVe(data.token);

        storageUserAndToken(data.producer, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setisLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setisLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setisLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setisLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        storageUserAndToken(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setisLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInUser,
        isLoadingUserStorageData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
