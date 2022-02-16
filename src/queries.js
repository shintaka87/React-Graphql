import { gql } from "@apollo/react-hooks";
// import gql from 'graphql-tag';

export const GET_TASKS = gql`
query{
    allTasks{
        edges{
            node{
                id
                title
            }
        }
    }
}
`;
export const CREATE_TASK = gql`
    mutation($title: String!){
        createTask(
            input:{title: $title}
        ){
            task{
                id
                title
            }
        }

}
`;
export const UPDATE_TASK = gql`
    mutation($id:ID!, $title:String!){
        updateTask(
            input:{
                id: $id 
                title: $title
            }
        ){
            task{
                id
                title
            }
        }
    }
`;
export const DELETE_TASK = gql`
    mutation($id:ID!){
        deleteTask(input:{id:$id}){
            task{
                id
            }
        }
    }
`;