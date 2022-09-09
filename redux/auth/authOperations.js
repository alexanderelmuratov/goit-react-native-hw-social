// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, changeAuthState, logoutUser, updateUserAvatar } =
  authSlice.actions;

export const authRegister =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({
        displayName: name,
      });
      const { uid, displayName } = await db.auth().currentUser;
      dispatch(
        updateUserProfile({ userId: uid, name: displayName, email: user.email })
      );
    } catch (error) {
      alert(error.message);
    }
  };

export const authLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await db
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      alert(error.message);
    }
  };

export const authLogout = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(logoutUser());
};

export const authAvatarChange = (avatar) => async (dispatch, getState) => {
  const user = await db.auth().currentUser;
  await user.updateProfile({
    photoURL: avatar,
  });
  const { photoURL } = await db.auth().currentUser;
  dispatch(updateUserAvatar({ avatar: photoURL }));
};

export const authStateChange = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    console.log("user", user);
    if (user) {
      dispatch(changeAuthState({ stateChange: true }));
      dispatch(
        updateUserProfile({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      );
    }
  });
};
