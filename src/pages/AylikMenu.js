import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import { success, warn, info, error } from 'tata-js/src/tata'
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik'
import { createdAPIEndpoint, ENDPOINTS } from '../api'
// import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

// import 'react-calendar/dist/Calendar.css';
// import '../../src/Calendar.css'
import CalendarMonth from '../components/CalendarMonth';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import { setReduxDate } from '../stores/dates';
import { useDispatch, useSelector } from 'react-redux';


function AylikMenu() {

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];


    const reduxDate = useSelector(state => state.dates.today)
    const dispatch = useDispatch()

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthName, setMonthName] = useState(monthNames[new Date(reduxDate).getMonth()]);
    let [allWeeks, setAllWeeks] = useState([]);

    var flag = false;

    const [calendarCurrentMonthDays, setCalendarCurrentMonthDays] = useState([]);
    const [calendarCurrentMonthWeeks, setCalendarCurrentMonthWeeks] = useState([]);


    const [monthlyApprovals, setMonthlyApprovals] = useState([]);

    const [showEditMenuModal, setShowEditMenuModal] = useState(false);
    const [editModalMenu, setEditModalMenu] = useState({});


    // EDIT FOOD MODALS
    const handleShowEditMenu = () => setShowEditMenuModal(true);
    const handleCloseEditMenu = () => {
        // values.gram = "";
        // values.timeOfTheDay = "";
        setShowEditMenuModal(false);
    }


    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            carb: 0,
            fat: 0,
            group: 0,
            kcal: 0,
            name: '',
            protein: 0,
            type: 0,
        },
        onSubmit: values => {
            console.log(values);
            values.type = parseInt(values.type);
            values.group = parseInt(values.group);
            // createdAPIEndpoint(ENDPOINTS.FOOD + "/PostFood").create(values)
            //     .then(res => {
            //         console.log(res);
            //         success('Başarılı', `${res.data.name} başarıyla eklendi.`)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //         error('Başarısız!', 'Yemek eklenemedi.')
            //     });
        },
        // validationSchema: validations.productValidations,

    })






    function toThisMonth() {
        // setSelectedDate(new Date())
        // setAllWeeks([]);

    }
    function nextMonth() {
        console.log(new Date(reduxDate).getMonth())
        var year = new Date(reduxDate).getFullYear()
        var month = new Date(reduxDate).getMonth()
        if (month == 11) {
            month = 0
            year += 1
        }
        else {
            month += 1
        }
        // setSelectedDate(new Date(year, month, 5))
        dispatch(setReduxDate(new Date(year, month, 5)))
        setMonthName(monthNames[new Date(reduxDate).getMonth()])
        setAllWeeks([]);
    }


    useEffect(() => {
        console.log("reduxDate", new Date(reduxDate).toLocaleDateString())
    }, [reduxDate])

    function previousMonth() {
        console.log(reduxDate)
        var year = new Date(reduxDate).getFullYear();
        var month = new Date(reduxDate).getMonth();

        console.log(year)
        console.log(month)

        if (month == 0) {
            month = 11
            year -= 1
        }
        else {
            month -= 1
        }
        // setSelectedDate(new Date(year, month, 5))
        dispatch(setReduxDate(new Date(year, month, 5)))
        setMonthName(monthNames[new Date(reduxDate).getMonth()])
        setAllWeeks([]);
    }




    function getDaysInMonth(month, year) {
        var customDate = new Date(Date.UTC(year, month, 1));
        console.log("customDate", customDate)
        var customDays = [];
        while (customDate.getUTCMonth() === month) {
            customDays.push(new Date(customDate).toJSON());
            customDate.setUTCDate(customDate.getUTCDate() + 1);
        }
        return customDays;
    }


    function openDailyMenuModal(weekDays) {
        console.log(weekDays)
        let props = {
            date: new Date(weekDays).toJSON()
        }
        console.log(props)

        createdAPIEndpoint(ENDPOINTS.MENU + "/GetDailyMenu/").fetchByDate(props)
            .then(res => {
                let menuToBeEdited = res.data;
                console.log(res.data);
                handleShowEditMenu();
                setEditModalMenu(menuToBeEdited);
            })
            .catch(err => {
                console.log(err);
                error("Menü Bulunamadı");
            })
    }



    useEffect(() => {

        var calendarElement = document.getElementById("calendarTable");
        calendarElement.setAttribute('class', 'table table-bordered');
        calendarElement.setAttribute('style', 'width: 1260px');
        calendarElement.innerHTML = `
        <tr class='mb-5 text-center'>
                <th style="width: 14.28%">Pazartesi</th>
                <th style="width: 14.28%">Salı</th>
                <th style="width: 14.28%">Çarşamba</th>
                <th style="width: 14.28%">Perşembe</th>
                <th style="width: 14.28%">Cuma</th>
                <th style="width: 14.28%">Cumartesi</th>
                <th style="width: 14.28%">Pazar</th>
            </tr>
        
        `;


        var ourmonth = new Date(reduxDate).getMonth();
        var ouryear = new Date(reduxDate).getFullYear();
        setCalendarCurrentMonthDays(getDaysInMonth(ourmonth, ouryear));
        var weeksList = [];


        var weeks = [];

        calendarCurrentMonthDays && calendarCurrentMonthDays.map((item, index, array) => {
            weeksList.push(item);

            if (new Date(item).getDay() == 1) {
                allWeeks.push(weeks);
                weeks = []
            }
            weeks.push(item);

            if (index === array.length - 1) {
                allWeeks.push(weeks)
                setAllWeeks(allWeeks)
            }
        })

        let myProps = {
            date: new Date(reduxDate).toJSON(),
        }
        createdAPIEndpoint(ENDPOINTS.MENU + "/GetMonthlyMenus").fetchByDate(myProps)
            .then(res => {
                let monthlyMenuList = res.data.map(item => ({
                    date: item.date,
                    isApproved: item.isApproved,
                }));
                setMonthlyApprovals(monthlyMenuList)

                console.log("monthlyApprovals", monthlyApprovals)
            })
            .catch(err => console.log(err))
    }, [reduxDate])


    return (
        <>

            <Modal size='lg' show={showEditMenuModal} onHide={handleCloseEditMenu} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Yemek Düzenleme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Yemek Düzenleme</h1>


                    <div className='container'>
                        <div className="row">
                            <div className='col-3'>
                                <label for="exampleInputEmail1">Yemek İsmi: </label>
                            </div>
                            <div className='col-9'>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalMenu.name} />
                            </div>
                        </div>



                        <div className="row mt-2">
                            <div className='col-3'>
                                <label for="exampleInputEmail1">Yemek grubu: </label>
                            </div>
                            <div className='col-9'>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalMenu.menuItem2.name} />
                            </div>
                        </div>


                        <div className="row mt-2">
                            <div className='col-3'>
                                <label for="exampleInputEmail1">Yemek çeşidi: </label>
                            </div>
                            <div className='col-9'>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalMenu.typeName} />
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-6'>
                                <div className="row mt-2">
                                    <div className='col-5'>
                                        <label for="exampleInputEmail1">Kalori: </label>
                                    </div>
                                    <div className='col-7'>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalMenu.kcal} />
                                    </div>
                                </div>


                                <div className="row mt-2">
                                    <div className='col-5'>
                                        <label for="exampleInputEmail1">Karbonhidrat: </label>
                                    </div>
                                    <div className='col-7'>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalMenu.carb} />
                                    </div>
                                </div>

                            </div>
                            <div className='col-6'>
                                <div className="row mt-2">
                                    <div className='col-5'>
                                        <label for="exampleInputEmail1">Protein: </label>
                                    </div>
                                    <div className='col-7'>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalMenu.protein} />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className='col-5'>
                                        <label for="exampleInputEmail1">Yağ: </label>
                                    </div>
                                    <div className='col-7'>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalMenu.fat} />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditMenu}>
                        Kapat
                    </Button>
                    <Button type="submit" variant="primary"
                    // onClick={handlePostActivity}
                    >
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='container'>
                <h2>{monthName}</h2>
                <div className='mt-4 '>
                    <button className='btn btn-info mb-3 text-white' onClick={() => previousMonth()}>
                        <MdOutlineNavigateBefore size={28} />
                    </button>
                    <button className='btn btn-info mb-3 mx-3 text-white py-2' onClick={() => toThisMonth()}>Günümüz</button>
                    <button className='btn btn-info mb-3 text-white' onClick={() => nextMonth()}>
                        <MdOutlineNavigateNext size={28} />
                    </button>
                </div>


                <table id='calendarTable' className='table table-bordered' style={{ 'width': '1260px' }}>
                    <thead>
                        <tr className='mb-5 text-center'>
                            <th style={{ 'width': '14.28%' }}>Pazartesi</th>
                            <th style={{ 'width': '14.28%' }}>Salı</th>
                            <th style={{ 'width': '14.28%' }}>Çarşamba</th>
                            <th style={{ 'width': '14.28%' }}>Perşembe</th>
                            <th style={{ 'width': '14.28%' }}>Cuma</th>
                            <th style={{ 'width': '14.28%' }}>Cumartesi</th>
                            <th style={{ 'width': '14.28%' }}>Pazar</th>
                        </tr>
                    </thead>

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


                                        // var result = monthlyApprovals.filter(obj => {
                                        //     return new Date(obj.date).toJSON() === new Date(new Date(weekDays).setHours(0, 0, 0, 0)).toJSON()
                                        // })
                                        // var myCondition = result[0]
                                        // myCondition && console.log(myCondition.isApproved)
                                        // console.log(result)

                                        return (
                                            weekDays == 0 ?
                                                <td>
                                                    <button className='btn mt-3 mb-3' style={{ 'width': '100%', 'height': '100px', 'borderRight': '1px solid black', 'borderLeft': '1px solid black', 'borderRadius': '0' }}>
                                                        <h3 className='dayValue'></h3>
                                                    </button>
                                                </td>
                                                :
                                                <td key={"dayTD-" + indexWeek + "-" + indexDay}>
                                                    <button onClick={() => openDailyMenuModal(weekDays)}

                                                        className='btn mt-3 mb-3' style={{ 'width': '100%', 'height': '100px', 'borderRight': '1px solid black', 'borderLeft': '1px solid black', 'borderRadius': '0', 'background': '#f6a6a6' }}>
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

            </div>
        </>

    )
}

export default AylikMenu
