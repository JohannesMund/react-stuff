import React, { ChangeEvent } from 'react';

/**
 * Genereller onChange Handler,
 * es wird der neue Wert aus dem Event übernommen und im setData gesetzt.
 * 
 * Funktioniert für strings, dates und check/radio-Boxen.
 * name Attribut des Input-Felds muss dem Attributnamen entsprechen!
 * 
 * @param setData Setter dispatch Funktion aus dem React-State.
 * @param event Das HTML Input Event.
 */
export function setInputChange<T>(
    setData: (value: React.SetStateAction<T>) => void,
    event: ChangeEvent<HTMLInputElement>): void {

    const target = event.target;
    const name = target.name;

    if (target.type === 'checkbox' || target.type === 'radio') {
        setData(data => { return {...data, [name]: target.checked}});    
    } else 
    if (target.type === 'date') {
        setData(data => { return {...data, [name]: new Date(target.value)}});
    } else {
        // string
        setData(data => { return {...data, [name]: target.value}});
    }
};

export function formatDateToString(date: Date): string {

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = date.getFullYear();
    
    return yyyy + '-' + mm + '-' + dd;
};


export function getInitialData() {
    return [
      {
        id: 0,
        taskName: "Test1",
        taskPriority: 0,
        dueDate: new Date("2024-05-01"),
        isDone: false,
      },
      {
        id: 1,
        taskName: "Test2",
        taskPriority: 1,
        dueDate: new Date("2024-05-01"),
        isDone: true,
      },
      {
        id: 2,
        taskName: "Test3",
        taskPriority: 3,
        dueDate: new Date("2023-01-01"),
        isDone: false,
      },
      {
        id: 3,
        taskName: "Test4",
        taskPriority: 2,
        dueDate: new Date("2023-01-01"),
        isDone: true,
      },
    ];
  }
