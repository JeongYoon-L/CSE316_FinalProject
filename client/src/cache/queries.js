import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			Name
			email
		}
	}
`;

export const GET_DB_MAPS = gql`
	query GetDBMaps {
		getAllMaps {
			_id
			id
			name
			owner
		}
	}
`;

export const GET_MAP_BY_ID = gql`
	query GetMapById ($_id: String!){
		getMapById (_id: $_id) {
			_id
			id
			name
			owner
		}
	}
`;


export const GET_DB_CURRENT_MAPS = gql`
	query GetAllCurrentMaps($CurrentID : String!) {
		getAllCurrentMaps(CurrentID : $CurrentID) {
			_id
			id
			name
			owner
		}
	}
`;

export const GET_DB_REGIONS = gql`
	query GetAllRegions($parentID : String!) {
		getAllRegions(parentID : $parentID) {
			_id
    		id
    		capital
			name
    		leader
    		Flag
    		parentRegion
    		landmark
		}
	}
`;
export const GET_DB_CURRENT_REGIONS = gql`
	query GetAllCurrentRegions($CurrentID : String!) {
		getAllCurrentRegions(CurrentID : $CurrentID) {
			_id
    		id
    		capital
			name
    		leader
    		Flag
    		parentRegion
    		landmark
		}
	}
`;
export const GET_DB_CHILDS = gql`
	query GetAllChildInfo($CurrentID : String!) {
		getAllChildInfo(CurrentID : $CurrentID) {
			_id
    		id
    		capital
			name
    		leader
    		Flag
    		parentRegion
    		landmark
		}
	}
`;


// export const GET_ALLPARENTS_BRANCHMAP = gql`
// query GetAllParentsBranchMap($_id: String!) {
// 		getAllParentsBranchMap(_id: $_id) 
// 	}
// `;
export const GET_ALLPARENTS_BRANCHREGION = gql`
query GetAllParentsBranchRegion($_id: String!) {
		getAllParentsBranchRegion(_id: $_id) {
			_id
    		name
		}
	}
`;