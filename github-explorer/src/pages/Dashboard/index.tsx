import React from 'react';

import { Title, Form, Repositories } from './styles';

import githubLogo from '../../assets/github-logo.svg';

const Dashboard: React.FC = () =>{
  return(
    <>
      <img src={githubLogo} alt="Github Explorer"/>
      <Title>Github Explorer</Title>;
      <Form>
        <input placeholder="Digite o nome do repositório..."/>
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="repository">
          <img src="https://avatars2.githubusercontent.com/u/37720776?s=460&u=c2366f04a4551e57365f0ef007e85c2f1edd4fe2&v=4" alt="avatar"/>
          <div>
            <strong>GoStack 13.0</strong>
            <p>Um curso fodasticamente foda.</p>
          </div>
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard;
