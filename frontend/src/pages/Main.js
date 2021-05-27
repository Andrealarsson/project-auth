import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import secret from '../reducers/secret'
import { API_URL } from '../reusable/urls'

const Wrapper = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;`

const Title = styled.h1`` 

const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken)
    const secrets = useSelector(store => store.secret.message)

    useEffect(() => {
      if (!accessToken) {
        history.push('/Login');
      }
    }, [accessToken, history]);

    console.log(accessToken)
    useEffect(() => {
        const option = {
            method: 'GET',
            headers: {
              Authorization: accessToken
            }  
        }
        fetch(API_URL('secret'), option)
        .then((res) => res.json())
        .then(data => {
            if(data.success) { 
              dispatch(secret.actions.setSecret(data)) 
              dispatch(secret.actions.setErrors(null))
            } else {
              dispatch(secret.actions.setErrors(data))
            }
        })
        .catch()
    },[accessToken, dispatch])

 return (
 <Wrapper> 
   <Title>{secrets? secrets.message : "loading..."}</Title> 
   </Wrapper>
 )
}

export default Main;