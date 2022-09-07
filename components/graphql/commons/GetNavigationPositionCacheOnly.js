import {gql} from "@apollo/client";

const GET_NAVIGATION_POSITION_CACHE_ONLY = gql`
  query NavigationPosition {
    navigationPosition @client
  }
`;

export default GET_NAVIGATION_POSITION_CACHE_ONLY;
