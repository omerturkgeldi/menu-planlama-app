import React from 'react';

function CalendarMonth({ allWeeks, flag }) {
    return (

        <table id='calendarTable' className='table table-bordered' style={{ 'width': '1260px' }}>
            <tr className='mb-5 text-center'>
                <th style={{ 'width': '14.28%' }}>Pazartesi</th>
                <th style={{ 'width': '14.28%' }}>Salı</th>
                <th style={{ 'width': '14.28%' }}>Çarşamba</th>
                <th style={{ 'width': '14.28%' }}>Perşembe</th>
                <th style={{ 'width': '14.28%' }}>Cuma</th>
                <th style={{ 'width': '14.28%' }}>Cumartesi</th>
                <th style={{ 'width': '14.28%' }}>Pazar</th>
            </tr>


            {allWeeks.length > 3 && allWeeks.map((week, indexWeek) => {

                if (allWeeks[0].length < 7 && flag == false) {
                    var howmany = 7 - allWeeks[0].length

                    for (let j = 0; j < howmany; j++) {
                        allWeeks[0].unshift("0");
                    }

                    flag = true;

                }

                // BİR HAFTA İÇİN TR AÇILIR
                return (
                    <tr id={"weekTR-" + indexWeek} key={"weekTR-" + indexWeek}>
                        {

                            week.map((weekDays, indexDay) => {

                                return (
                                    weekDays == 0 ?
                                        <td>
                                            <button className='btn mt-3 mb-3' style={{ 'width': '100%', 'height': '100px', 'borderRight': '1px solid black', 'borderLeft': '1px solid black', 'borderRadius': '0' }}>
                                                <h3 className='dayValue'></h3>
                                            </button>
                                        </td>
                                        :
                                        <td key={"dayTD-" + indexWeek + "-" + indexDay}>
                                            <button onClick={() => alert(new Date(weekDays).toLocaleDateString())} className='btn mt-3 mb-3' style={{ 'width': '100%', 'height': '100px', 'borderRight': '1px solid black', 'borderLeft': '1px solid black', 'borderRadius': '0', 'background': 'green' }}>
                                                <h3 className='dayValue'>{new Date(weekDays).getDate()}</h3>
                                            </button>
                                        </td>
                                )
                            })
                        }
                    </tr>
                )
            })}
        </table>


    )
}

export default CalendarMonth;
