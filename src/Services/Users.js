import React, {useEffect, useState} from 'react'

const Users = () => {

    const [user, setUser] = useState(null);

  useEffect(()=>{
    fetch('https://sps-p2p.herokuapp.com/users.json')
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        const userData = {
            id: data[0].id,
            name: data[0].nickname,
        };

        setUser(userData)
    });
  },[])

  return (
    <>
       {user?  (<p>{user.id}</p>) : null}
       {user?  (<p>{user.name}</p>) : null}
    </>
  )
}
/* Fetch users Api */

export default Users;