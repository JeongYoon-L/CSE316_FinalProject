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