import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			Name
			password
			initials
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!,  $Name: String!) {
		register(email: $email, password: $password,  Name: $Name) {
			email
			password
			Name
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const UPDATE = gql`
	mutation Update($email: String!, $password: String!,  $Name: String!, $CurrentUserId : String!, $CurrentUserEmail : String!) {
		update(email: $email, password: $password,  Name: $Name , CurrentUserId : $CurrentUserId, CurrentUserEmail : $CurrentUserEmail) {
			email
			password
			Name
		}
	}
`;
export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateRegionField($itemId: String!, $field: String!, $value: String!,   $indexID : [String]!) {
		updateRegionField(itemId: $itemId, field: $field, value: $value, indexID: $indexID) 
	}
`;


// export const ADD_ITEM = gql`
// 	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
// 		addItem(item: $item, _id: $_id, index: $index)
// 	}
// `;

// export const DELETE_ITEM = gql`
// 	mutation DeleteItem($itemId: String!, $_id: String!) {
// 		deleteItem(itemId: $itemId, _id: $_id) {
// 			_id
// 			description
// 			due_date
// 			assigned_to
// 			completed
// 		}
// 	}
// `;

// export const UPDATE_ITEM_FIELD = gql`
// 	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
// 		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
// 			_id
// 			description
// 			due_date
// 			assigned_to
// 			completed
// 		}
// 	}
// `;

// export const REORDER_ITEMS = gql`
// 	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
// 		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
// 			_id
// 			description
// 			due_date
// 			assigned_to
// 			completed
// 		}
// 	}
// `;

// export const SORT_ITEMS = gql`
// 	mutation SortItems($_id: String!, $criteria: String!) {
// 		sortItems(_id: $_id, criteria: $criteria) {
// 			_id
// 			description
// 			due_date
// 			assigned_to
// 			completed
// 		}
// 	}
// `;

// export const ADD_TODOLIST = gql`
// 	mutation AddTodolist($todolist: TodoInput!) {
// 		addTodolist(todolist: $todolist) {
// 			_id
// 			name
// 			owner
// 			items {
// 				_id
// 				description
// 				due_date
// 				assigned_to
// 				completed
// 			}
// 			sortRule
// 			sortDirection
// 		}
// 	}
// `;

// export const DELETE_TODOLIST = gql`
// 	mutation DeleteTodolist($_id: String!) {
// 		deleteTodolist(_id: $_id)
// 	}
// `;

// export const UPDATE_TODOLIST_FIELD = gql`
// 	mutation UpdateTodolistField($_id: String!, $field: String!, $value: String!) {
// 		updateTodolistField(_id: $_id, field: $field, value: $value)
// 	}
// `;


export const CREATE_MAP = gql`
	mutation CreateMap($map: MapInput!) {
		createMap(map: $map) 
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deleteMap(_id: $_id) 
	}
`;

export const EDIT_MAP_NAME = gql`
	mutation EditMapName($_id : String! , $name : String!) {
		editMapName(_id : $_id , name : $name)
	}
`;

export const CREATE_SUBREGION = gql`
	mutation AddRegion($region: RegionInput!, $indexID : [String]! ) {
		addRegion(region: $region, indexID: $indexID) 
	}
`;

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!,  $indexID : [String]!) {
		deleteRegion(_id: $_id, indexID: $indexID) 
	}
`;

export const TOP_MAP = gql`
	mutation currentMapOnTop($mapID: String!) {
		currentMapOnTop(mapID: $mapID) 
	}
`;

export const SORT_ITEMS = gql`
	mutation SortTodoItems($updateitems: [String]!) {
		sortTodoItems(updateitems: $updateitems)
	}
`;
export const ARROW_VIEWER = gql`
	mutation FindwithArrowViewer($_id: String!, $direction: String!) {
		findwithArrowViewer(_id: $_id, direction : $direction ){
			_id
			id
			capital
			name
			leader
			parentRegion
			landmark
			parentName
		}
	}
`;
export const ADD_LANDMARK = gql`
	mutation AddLandmarkfield($_id: String!, $landmark: [String]) {
		addLandmarkfield(_id:$_id , landmark:$landmark)
	}
`;
export const EDIT_LANDMARK_FIELD = gql`
	mutation EditLandmarkfield($_id: String!, $landmark: [String]) {
		editLandmarkfield(_id:$_id , landmark:$landmark)
	}
`;
export const EDIT_PARENT_REGION = gql`
	mutation UpdateParent_RegionIDField($itemId: String!, $parentRegion: String! ) {
		updateParent_RegionIDField(itemId:$itemId , parentRegion:$parentRegion)
	}
`;