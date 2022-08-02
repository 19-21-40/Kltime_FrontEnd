import React, { useReducer, createContext, useContext } from 'react';

const testtotalLectures=[
    {
        id: "H030-2-0448-02",
        lectureName: "디지털논리",
        professor: "김진우",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "월", startTime: "15:00", endTime: "16:30" },
            { day: "수", startTime: "16:30", endTime: "18:00" },
        ],
        level: 2,
        section: "전선",
        credit: 3,
        notes: ""
    },
    {
        id: "0000-1-0670-01",
        lectureName: "법과생활",
        professor: "손명지",
        department: "전체공통",
        lectureTimes: [
            { day: "화", startTime: "08:00", endTime: "13:30" },
            { day: "목", startTime: "13:30", endTime: "15:00" },
        ],
        level: 1,
        section: "교선",
        credit: 3,
        notes: ""
    },
    {
        id: "H030-2-1183-01",
        lectureName: "이산구조",
        professor: "최민규",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "금", startTime: "9:00", endTime: "12:00" }
        ],
        level: 2,
        section: "전선",
        credit: 3,
        notes: ""
    },
    {
        id: "H030-2-3403-03",
        lectureName: "고급프로그래밍",
        professor: "이강훈",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "화", startTime: "16:30", endTime: "18:00" },
            { day: "목", startTime: "15:00", endTime: "16:30" },
        ],
        level: 2,
        section: "전선",
        credit: 3,
        notes: ""
    },
    {
        id: "H030-3-3663-01",
        lectureName: "데이터베이스",
        professor: "문승현",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "화", startTime: "15:00", endTime: "16:30" },
            { day: "목", startTime: "16:30", endTime: "18:00" },
        ],
        level: 3,
        section: "전선",
        credit: 3,
        notes: ""
    },
    {
        id: "H030-2-8484-01",
        lectureName: "리눅스활용실습",
        professor: "박병준",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "금", startTime: "15:00", endTime: "18:00" },
        ],
        level: 2,
        section: "전필",
        credit: 2,
        notes: ""
    },
    {
        id: "H040-2-9616-02",
        lectureName: "빅데이터언어",
        professor: "임동혁",
        department: "정보융합학부",
        lectureTimes: [
            { day: "월", startTime: "16:30", endTime: "18:00" },
            { day: "수", startTime: "15:00", endTime: "16:30" },
        ],
        level: 2,
        section: "일선",
        credit: 3,
        notes: ""
    },
    {
        id: "1160-1-3415-01",
        lectureName: "대학화학및실험1",
        professor: "양재규",
        department: "환경공학과",
        lectureTimes: [
            { day: "월", startTime: "09:00", endTime: "12:30" },
            { day: "수", startTime: "10:30", endTime: "12:00" },
        ],
        level: 1,
        section: "기필",
        credit: 3,
        notes: ""
    },
];

const initialState = {
    totalTimeTable:[
        {
            id:1,
            tableName:"시간표1",
            lectureList:[]
        },
        {
            id:2,
            tableName:"시간표2",
            lectureList:[]
        },
    ],
    selectedId:1,
    searchedLectures:testtotalLectures,
    previewId:-1
};

function timeTableReducer(state,action){
    switch(action.type){
        case 'CREATE_TABLE'://시간표 추가
            return{
                ...state,
                totalTimeTable:state.totalTimeTable.concat(action.timeTable),
                selectedId:action.id,
            }
        case 'READ_TABLE'://시간표 선택시 불러오기
            return{
                ...state,
                selectedId:action.id,
            }
        case 'UPDATE_TABLE'://시간표 수정(이름)
            return{
                ...state,
                totalTimeTable:state.totalTimeTable.map(timeTable=>
                    timeTable.id===state.selectedId?
                    {
                        ...timeTable,
                        tableName:action.tableName
                    }
                        :timeTable),
            }
        case 'DELETE_TABLE'://시간표 삭제
            let isFirstIndex = false;
            if(action.id === state.totalTimeTable[0].id){
                isFirstIndex = true;
            }
            if(state.totalTimeTable.length === 1)
            { return {...state} }
            return {
                ...state,
                selectedId: isFirstIndex? state.totalTimeTable[1].id : state.totalTimeTable[0].id,
                totalTimeTable: state.totalTimeTable.filter(timeTable=>timeTable.id!==action.id),
            }
        case 'SEARCH_LECTURE': //강의 검색 // 이성훈이 추가함
            return{
                ...state,
                searchedLectures:action.searchedLectures,
            }
        case 'ADD_LECTURE'://강의 추가
            return{
                ...state,
                totalTimeTable:state.totalTimeTable.map(timeTable=>
                    timeTable.id===state.selectedId?
                    {
                        ...timeTable,
                        lectureList:timeTable.lectureList.concat(action.lecture)
                    }
                    :timeTable),
            }
        case 'EDIT_LECTURE'://강의 편집
            return{
                ...state,
                totalTimeTable:state.totalTimeTable.map(timeTable=>
                    timeTable.id===state.selectedId?
                    {
                        ...timeTable,
                        lectureList:timeTable.lectureList.map(lecture=>lecture.id===action.id?action.lecture:lecture)
                    }
                    :timeTable)
            }
        case 'DELETE_LECTURE'://강의 삭제
            return{
                ...state,
                totalTimeTable:state.totalTimeTable.map(timeTable=>
                    timeTable.id===state.selectedId?
                    {
                        ...timeTable,
                        lectureList:timeTable.lectureList.filter(lecture=>lecture.id!==action.id)
                    }
                    :timeTable)
            }
        case 'PREVIEW_LECTURE':
            return{
                ...state,
                previewId:state.previewId===-1?action.id:-1
            }
        default:
            return state;
    }
}

const UserTableStateContext=createContext();
const UserTableDispatchContext=createContext();

export function UserTableProvider({ children }) {
  const [state, dispatch] = useReducer(timeTableReducer, initialState);
  return (
    <UserTableStateContext.Provider value={state}>
      <UserTableDispatchContext.Provider value={dispatch}>
        {children}
      </UserTableDispatchContext.Provider>
    </UserTableStateContext.Provider>
  );
}

export function useUserTableState() {
  return useContext(UserTableStateContext);
}

export function useUserTableDispatch() {
  return useContext(UserTableDispatchContext);
}