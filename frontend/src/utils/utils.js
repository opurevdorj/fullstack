import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {storage} from "../components/firebase/myfirebase"


export const uploadImage = async (file) => {
    console.log(file);
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    const downloadImageUrl = await getDownloadURL(storageRef);

    return downloadImageUrl;
  };