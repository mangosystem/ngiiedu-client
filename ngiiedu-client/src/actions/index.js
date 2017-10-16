import * as types from './ActionTypes';

export const actionSample =(text) =>({
    type : types.ACTION_SAMPLE,
    text
});

//위 코드와 동일
// export function testRedux({value, value2}){
//     return {type : REDUX_SAMPLE}
// }

export const actionSample2 =(color) =>({
    type :types.ACTION_SAMPLE2,
    color,
});


// UserPopup 상세정보
export const actionUserid = (userid) => ({
    type: types.USERID,
    userid
});

// UserPopup
export const actionOpen = (open) => ({
    type: types.ACTION_OPEN,
    open
});

//schools_sync_editColumn
export const actionSchoolSyncEditColumn = (editColumn)=>({
    type: types.SCHOOLS_SYNC_EDITCOLUMN,
    editColumn
});

// 관리자 사용자 관리 검색
export const actionSearch = (keyword) => ({
    type: types.ACTION_SEARCH,
    keyword
});

//school id 받아오기
export const actionSchoolId = (schoolId) =>({
    type: types.SCHOOL_ID,
    schoolId
})

//학교 상세정보
export const actionSchoolInfoOpen = (infoOpen) => ({
    type: types.SCHOOL_INFO_OPEN,
    infoOpen
})

//학교 정보 수정
export const actionEditSchoolOpen = (editOpen) => ({
    type: types.EDIT_SCHOOL_OPEN,
    editOpen
})

//학교 생성
export const actionAddSchoolOpen = (addOpen) => ({
    type: types.ADD_SCHOOL_OPEN,
    addOpen
})

//학교 단일 삭제
export const actionDelSchoolOpen = (deleteOpen) => ({
    type: types.DEL_SCHOOL_OPEN,
    deleteOpen
})

//학교 검색
export const actionSearchSchool = (schoolLevel, category, keyword) => ({
    type: types.SEARCH_SCHOOL,
    schoolLevel,
    category,
    keyword
})

//학교목록 새로고침
export const actionUpdateSchool = (tableData) => ({
    type: types.UPDATE_SCHOOL,
    tableData
})