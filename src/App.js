import React from 'react';
import './App.css';
import {ApolloProvider} from "@apollo/react-hooks";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import MainPage from './components/MainPage';


const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
      <header className="App-header">
       <MainPage/>
      </header>
    </div>
    </ApolloProvider>
    
  );
}

export default App;
