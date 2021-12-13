# ST-2-REST-API

# Endpoints:

## 1. http://localhost:5000/users

<details><summary>POST</summary>
 you need to send in your request:

body = {  
 &ensp;login: string;  
 &ensp;password: string;  
 &ensp;age: number;  
 }

 </details>
 <details><summary>GET</summary>
 you need to add in your query string:

limit={number}, by default limit = 10  
loginSubstring={string}  
totally looks like:  
http://localhost:5000/users?loginSubstring={string}&limit={number}  
you can also use just one of this parameter,  
but if no one use, by default return users without sort, but maximum 10

 </details>

## 2. http://localhost:3000/users/:{userId}

 <details><summary>GET</summary>

totally looks like:  
 http://localhost:5000/users/:{userId}  
 if doesn't have this user or something wrong you will get message

 </details>
 <details><summary>DELETE</summary>
  
 totally looks like:  
 http://localhost:5000/users/:{userId}  
 Make sofr delete users by id
 if doesn't have this user or this user already deleted you will get message

 </details>
 <details><summary>PUT</summary>
  
 totally looks like:  
 http://localhost:5000/users/:{userId}  
 you need to send in your request:

body = {  
 &ensp;login: string;  
 &ensp;password: string;  
 &ensp;age: number;  
 }  
 you can change only this parameters

also, if user already deleted, or doesn't exist, you can change nothing and will get a message

 </details>

## 3. http://localhost:5000/groups

<details><summary>POST</summary>
 you need to send in your request:

body = {  
 &ensp;name: string;  
 &ensp;permissions: Permission[];
}  
where permissions is an array of this type:  
type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

 </details>

 <details><summary>GET</summary>
 don't need extra parameters

 </details>

## 4. http://localhost:5000/groups/:{groupId}

 <details><summary>GET</summary>

you just need to add in your path id of group
totally looks like:  
 http://localhost:5000/groups/:{groupId}  
 if doesn't have this group or something wrong you will get message

 </details>
 <details><summary>DELETE</summary>
 
 add group ID to the end of string  
  
 totally looks like:  
 http://localhost:5000/groups/:{groupId}  
 if doesn't have this group or this user already deleted you will get message

 </details>
 <details><summary>PUT</summary>

add user ID to the end of string

totally looks like:  
 http://localhost:5000/groups/:{groupId}  
you need to send in your request:

body = {  
 &ensp;name: string;  
 &ensp;permissions: Permission[];
}  
where permissions is an array of this type:  
type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

 </details>

## 5. http://localhost:5000/groups/:{groupId}

<details><summary>PUT (addUsersToGroup(groupId, userIds))</summary>

add groupId to the end of string like this:  
http://localhost:5000/groups/:{groupId}  
you need to send in your request:

body = {  
 &ensp;userIds: UserId[];
}  
where UserId[] is an array of users Ids like this:  
body = {  
 &ensp;userIds: [
"3d40db2d-4670-4034-a505-9d3d0c8fff9b",
"fda96534-4d31-44af-98a5-4719df6d94a3",
"2e1afe61-4eab-47dc-bb64-431b88ab46c8"]  
 }

</details>

## 6. http://localhost:5000/login

<details><summary>POST</summary>

http://localhost:3000/login  
you need to send in your request:

body = {  
 &ensp;login: "Maybelle480";  
 &ensp;password: "RPuS_XGf5NjNOlf";  
 }

after that u will have token

 </details>