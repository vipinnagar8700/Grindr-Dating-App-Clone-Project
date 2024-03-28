import { useEffect } from "react";
import { apiUrlAllUsers, apiUrlLogin, apiUrlLogoutUser, apiUrlMe, apiUrlRegister, apiUrlSendMessage, apiUrlSingleUser, apiUrlUpdateUserDetails, apiUrlUserChat, apiUrlUserChatSingle, apiUrlUserDeleteAlbum, apiUrlUserFavourates, apiUrlUserFilter, apiUrlUserFlame, apiUrlUserReadMessage, apiUrlUserViewer, apiUrlUsergallery } from "./ApiUrl";

// Login Api
export const LoginApi = (phoneNumberWithCode, password) => {
  const myHeaders = new Headers();

  const formdata = new FormData();
  formdata.append("login", phoneNumberWithCode);
  formdata.append("password", password);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${apiUrlLogin}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
};

// Register Api
export const RegisterApi = (email,password,selectedDate,formattedPhoneNumber) => {
  console.log(selectedDate,"selectedDate")
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("dob", selectedDate);
  formdata.append("phone", formattedPhoneNumber);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch(
    `${apiUrlRegister}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
};

// Get User Api i.e me Api
export const UserDetailsApi =(userId)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

return fetch(`${apiUrlMe}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {return result})
  .catch((error) => {throw error});
}

// Get All Users
export const AllUsers = (userId)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

return fetch(`${apiUrlAllUsers}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {return result})
  .catch((error) => {throw error});
}

// Update User data
export const UpdateUserData =(userId,id,UsersMe,displayName,About,selectedBodyType,selectedGender,selectedLooking,selectedTribles,imageUri) =>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);
const formdata = new FormData();

if(imageUri){
  // Extract the file name from the profileImage path
  const filename = imageUri.split("/").pop();
  // Create a new file object with the image URI and name
  const imageFile = {
    uri: imageUri,
    name: filename,
    type: "image/jpeg" // Adjust the type if necessary
  };
  // Append the image file to the FormData object
  formdata.append("image", imageFile);
}
if(displayName){
  formdata.append("display_name",displayName);
}
if(About){
  formdata.append("about_me",About);
}
if(UsersMe?.age){
  console.log(UsersMe?.age,"UsersMe?.age")
  formdata.append("age", UsersMe?.age);
}
if(UsersMe?.height){
  formdata.append("height",UsersMe?.height );
}
if(UsersMe?.weight){
  formdata.append("weight",UsersMe?.weight);
}

if(selectedBodyType){
  formdata.append("body_type",selectedBodyType);
}

if(selectedTribles){
  formdata.append("tribes",selectedTribles);
}

if(selectedLooking){
  formdata.append("looking_for", selectedLooking);
}

if(selectedGender){
  console.log(selectedGender)
  formdata.append("gender", selectedGender);
}

if(UsersMe?.instagram){
  formdata.append("instagram", UsersMe?.instagram);
}
if(UsersMe?.spotify){
  formdata.append("spotify", UsersMe?.spotify);
}
if(UsersMe?.twitter){
  formdata.append("twitter", UsersMe?.twitter);
}
if(UsersMe?.facebook){
  formdata.append("facebook", UsersMe?.facebook);
}

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlUpdateUserDetails}/${id}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
 
}

// Update User data
export const UpdateUserDataLocation =(userId, id, longitude, latitude) =>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);
const formdata = new FormData();


if(longitude){
  formdata.append("longitude",longitude);

}
if(latitude){
  formdata.append("latitude",latitude);

}

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlUpdateUserDetails}/${id}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
 
}

// Update User data
export const UpdateUserDataFCM =(userId, userIdMain,token) =>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);
const formdata = new FormData();


if(token && token){
  console.log(token,"aaaa")
  formdata.append("fcm_token",token);
  console.log(token,"DoneQ")
}


const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlUpdateUserDetails}/${userIdMain}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// Update User data
export const UpdateUserDataComplete = async (userId, userIdMain, profileImage, displayName, selectedGender) => {
  console.log(userId, userIdMain, profileImage, displayName, selectedGender,"userId, userIdMain, profileImage, displayName, selectedGender")
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userId}`);

  const formData = new FormData();
  if (displayName) {
    formData.append("display_name", displayName);
  }
  if (selectedGender) {
    formData.append("gender", selectedGender);
  }
  if (profileImage) {
    // Extract the file name from the profileImage path
    const filename = profileImage.split("/").pop();
    // Create a new file object with the image URI and name
    const imageFile = {
      uri: profileImage,
      name: filename,
      type: "image/jpeg" // Adjust the type if necessary
    };
    // Append the image file to the FormData object
    formData.append("image", imageFile);
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${apiUrlUpdateUserDetails}/${userIdMain}`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

// logout
export const LogoutUser =(userId)=>{
 
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

return fetch(`${apiUrlLogoutUser}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// Single Users data 
export const SingleUser =(userId,userIdMain)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);


const formdata = new FormData();
formdata.append("user_id",userIdMain);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlSingleUser}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// Single Users data 
export const UserViwers =(userId)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);


const formdata = new FormData();

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

return fetch(`${apiUrlUserViewer}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// Send Messages with Image
export const SendMessage =(token,userIdMain,message,selectedImage)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const formdata = new FormData();
formdata.append("receiver_id", userIdMain);
formdata.append("message", message);

if (selectedImage) {
  // Extract the file name from the profileImage path
  const filename = selectedImage.split("/").pop();
  // Create a new file object with the image URI and name
  const imageFile = {
    uri: selectedImage,
    name: filename,
    type: "image/jpeg" // Adjust the type if necessary
  };
  // Append the image file to the FormData object
  formdata.append("file", imageFile);
}
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlSendMessage}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// Send Message
export const SendMessageMain =(token,userIdMain,message)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const formdata = new FormData();
formdata.append("receiver_id", userIdMain);
formdata.append("location", message);
formdata.append("file", null);
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlSendMessage}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// AllChatUsers
export const AllchatUsers =(userId)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

return fetch(`${apiUrlUserChat}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// AllChatUsersSingle
export const AllchatUsersSingle =(userId,userIdMain)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const formdata = new FormData();
formdata.append("receiver_id",userIdMain);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlUserChatSingle}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// UserFlame
export const UserFlame =(userId)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const formdata = new FormData();

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

return fetch(`${apiUrlUserFlame}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// UserFlame
export const UserFavourate =(userId)=>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const formdata = new FormData();

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

return fetch(`${apiUrlUserFavourates}`, requestOptions)
.then((response) => response.json())
.then((result) => {return result})
.catch((error) => {throw error});
}

// Upload Image Gallery
export const UpdateGalleryImages = (userId, albumImage) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userId}`);

  const formdata = new FormData();

  if (albumImage) {
    // Extract the file name from the profileImage path
    const filename = albumImage.split("/").pop();
    // Create a new file object with the image URI and name
    const imageFile = {
      uri: albumImage,
      name: filename,
      type: "image/jpeg" // Adjust the type if necessary
    };
    // Append the image file to the FormData object
    formdata.append("images[0]", imageFile);
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${apiUrlUsergallery}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

// Filter Users api
export const filterUser = (selectedOption, ageValue,  selectedTribes,selectedBodyType,selectedLook) => {
  console.log(token, selectedOption, ageValue, Height, Weight, selectedTribes, selectedBodyType, selectedRelation, selectedAccept, selectedLook, selectedMeet)
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let url = "https://dating.pinnacledigitalsolution.online/api/user/filter?";

  // Include 'online' parameter in URL query string if 'selectedOption' is "online"
  if (selectedOption === "online") {
    url += "online=1&";
  }

  // Add other parameters to URL query string if they are provided
  if (ageValue !== "") url += `age=${ageValue}&`;
  if (selectedTribes.length > 0) url += `tribes=${selectedTribes.join(",")}&`; // Assuming selectedTribes is an array of selected tribe names
  if (selectedBodyType !== "") url += `body_type=${selectedBodyType}&`;
  if (selectedLook !== "") url += `looking_for=${selectedLook}&`;

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}

// Read Message api
export const ReadMessages =(userId,userIdMain)=>{
  try {
    const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const formdata = new FormData();
formdata.append("sender_id", userIdMain);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlUserReadMessage}`, requestOptions)
.then((response) => response.json())
.then((result) => result)
.catch((error) => {
  throw error;
});
  } catch (error) {
    console.log(error)
  }
}

// Delete Image in Gallery
export const DeleteUploadGallery =(id,userId)=>{
  console.log(id,userId)
  try {
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const formdata = new FormData();
formdata.append("image_ids[0]", id);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

return fetch(`${apiUrlUserDeleteAlbum}`, requestOptions)
.then((response) => response.json())
.then((result) => result)
.catch((error) => {
  throw error;
});
  } catch (error) {
    console.log(error)
  }
}

export const SubscriptionApi =(userId)=>{
  try {
    const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userId}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

return fetch(`${apiUrlUserChat}`, requestOptions)
.then((response) => response.json())
.then((result) => result)
.catch((error) => {
  throw error;
});
  } catch (error) {
    console.log(error)
  }
  
  
}


