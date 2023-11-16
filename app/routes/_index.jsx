// export const meta = () => {
//   return [{ title: "New Remix App" }];
// };

// export default function Index() {
//   return (
//     <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
//       <h1>Welcome to Remix</h1>
//       <ul>
//         <li>
//           <a
//             target="_blank"
//             href="https://remix.run/tutorials/blog"
//             rel="noreferrer"
//           >
//             15m Quickstart Blog Tutorial
//           </a>
//         </li>
//         <li>
//           <a
//             target="_blank"
//             href="https://remix.run/tutorials/jokes"
//             rel="noreferrer"
//           >
//             Deep Dive Jokes App Tutorial
//           </a>
//         </li>
//         <li>
//           <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
//             Remix Docs
//           </a>
//         </li>
//       </ul>
//     </div>
// // function Calendar({ options }) {
//   const calendarRef = useRef(null);

//   useEffect(() => {
//   jSuites.calendar(calendarRef.current, options);
//   }, [options]); }  );

// return <input ref={calendarRef} />;}

import { Form,useActionData} from "@remix-run/react";// is used to access data from the action function
import { json } from "@remix-run/node"
import jSuites from "jsuites";
import {useRef, useEffect,useState } from "react";

//import "jsuites/dist/jsuites.css";

export function loader(){
    return null
}

export default function login(){
  const actionData = useActionData()
  const [formData,setFormData]= useState({
    name:'',
    lname:'',
    password:'',
  });
  const handleSumbit=(e)=>{
    //e.preventDefault();
    console.log(formData)
  }

  return(
    
    <Form method='post' onSubmit={handleSumbit} reloadDocument={false}>
      <p>
      <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />{actionData?.errors?.name ? (//conditionally render error messages,, optional chaining operator
            <em>{actionData?.errors.name}</em>
          ) : null}
      </p>
      <p>
      <label htmlFor="lname">LName:</label>
        <input type="text" name="lname" value={formData.lname}
          onChange={(e) => setFormData({ ...formData, lname: e.target.value })}/>
          {actionData?.errors?.lname ? (
            <em>{actionData?.errors.lname}</em>
          ) : null}
      </p>
      
      <p>
      <label htmlFor="pname">PName:</label>
        <input type="password" name="password" value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          {actionData?.errors?.password ? (
            <em>{actionData?.errors.password}</em>
          ) : null}
      </p>
      <p>

      </p>
      <p></p>
 
  
      <button type="submit">Sign Up</button>
    </Form>
  )
}
export async function action({request}){

//  const formData = new URLSearchParams(await request.text());//essentially reading the text data from the request body and parsing it into a URLSearchParams ,, data is sent in the request body
 const formData = await Object.fromEntries(await request.formData())
 console.log("formData name", formData?.name)
//  const formData = await Object.fromEntries(form);
 console.log("formData", formData)
 const {name, lname, password} = formData;
  // const name = formData.get("name");
  // const lname = formData.get("lname");
  // const password = formData.get("password");

  const errors = {};

  if (!name || !name.includes("@")) {
    errors.name = "Invalid email address";
  }
  if (!lname || !lname.includes("@")) {
    errors.lname = "Invalid email address";
  }

  if (!password || password.length < 12) {
    errors.password = "Password should be at least 12 characters";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }
}