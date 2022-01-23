import React, { useEffect, useState } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik'
import { createdAPIEndpoint, ENDPOINTS } from '../api'

function YemekListesi() {

    const [showAddFoodModal, setShowAddFoodModal] = useState(false);
    const [showEditFoodModal, setShowEditFoodModal] = useState(false);
    const [showDeleteFoodModal, setShowDeleteFoodModal] = useState(false);


    const [foods, setFoods] = useState();
    const [editModalFood, setEditModalFood] = useState({});

    const [foodIdToBeDeleted, setFoodIdToBeDeleted] = useState();



    // SHOW FOOD MODALS
    const handleShowAddFood = () => setShowAddFoodModal(true);
    const handleCloseAddFood = () => {
        // values.gram = "";
        // values.timeOfTheDay = "";
        setShowAddFoodModal(false);
    }


    // EDIT FOOD MODALS
    const handleShowEditFood = () => setShowEditFoodModal(true);
    const handleCloseEditFood = () => {
        // values.gram = "";
        // values.timeOfTheDay = "";
        setShowEditFoodModal(false);
    }



    // DELETE FOOD MODALS
    const handleShowDeleteFood = (id) => {
        setShowDeleteFoodModal(true)
        setFoodIdToBeDeleted(id)
    }
    const handleCloseDeleteFood = () => {
        // values.gram = "";
        // values.timeOfTheDay = "";
        setShowDeleteFoodModal(false);
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
            createdAPIEndpoint(ENDPOINTS.FOOD + "/PostFood").create(values)
                .then(res => {
                    console.log(res);
                    success('Başarılı', `${res.data.name} başarıyla eklendi.`)
                })
                .catch(err => {
                    console.log(err)
                    error('Başarısız!', 'Yemek eklenemedi.')
                });
        },
        // validationSchema: validations.productValidations,

    })






















    const handleDelete = () => {

        createdAPIEndpoint(ENDPOINTS.FOOD + "/DeleteFood/" + foodIdToBeDeleted).delete()
            .then(res => {
                setShowDeleteFoodModal(false);
                success('Başarılı!', 'Yemek başarıyla silindi.')
            })
            .catch(err => {
                console.log(err)
                setShowDeleteFoodModal(false);
                error('Başarısız!', 'Aktivite silinemedi.')
            })
    }



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.FOOD + "/GetFoods").fetchAll()
            .then(res => {
                console.log(res.data);
                let foodList = res.data.map(item => ({
                    id: item.id,
                    group: item.group,
                    name: item.name,
                    kcal: item.kcal,
                    carb: item.carb,
                    protein: item.protein,
                    fat: item.fat,
                    typeId: item.typeId,
                    typeName: item.typeName
                }));
                setFoods(foodList)
            })
            .catch(err => console.log(err))
        console.log("foods", foods)
    }, [])




    return (


        <>
            <Modal size='lg' show={showAddFoodModal} onHide={handleCloseAddFood} animation={false}>
            <form onSubmit={handleSubmit} autoComplete='off' className='mt-5 mb-5'>
                <Modal.Header closeButton>
                    <Modal.Title>Yemek Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>

                            <div className='row'>

                                <div className="row">
                                    <div className='col-3'>
                                        <label htmlFor="name">Yemek İsmi: </label>
                                    </div>
                                    <div className='col-9'>
                                        <input type="text" className="form-control" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                </div>



                                <div className="row mt-2">
                                    <div className='col-3'>
                                        <label htmlFor="group">Yemek grubu: </label>
                                    </div>
                                    <div className='col-9'>
                                        <select type="number" className="form-control" name='group' value={values.group} onChange={handleChange} onBlur={handleBlur} >
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="row mt-2">
                                    <div className='col-3'>
                                        <label for="type">Yemek çeşidi: </label>
                                    </div>
                                    <div className='col-9'>
                                        <select type="number" className='form-control'
                                        name="type" value={values.type} onChange={handleChange} onBlur={handleBlur}>
                                            <option value={1}>Çorba</option>
                                            <option value={2}>Kızartma</option>
                                            <option value={3}>Pirinç Pilavı</option>
                                            <option value={4}>Bulgur Pilavı</option>
                                            <option value={5}>Makarna</option>
                                            <option value={6}>Şehriye Pilavı</option>
                                            <option value={7}>Kuskus</option>
                                            <option value={8}>Erişte</option>
                                            <option value={9}>Spagetti</option>
                                            <option value={10}>Kısır</option>
                                            <option value={11}>Mantı</option>
                                            <option value={12}>Kuru Fasulye</option>
                                            <option value={13}>Barbunya</option>
                                            <option value={15}>Mercimek</option>
                                            <option value={16}>Nohut</option>
                                            <option value={17}>Beyaz Et Yemeği</option>
                                            <option value={18}>Zeytinyağlı</option>
                                            <option value={19}>Kırmızı Et Yemeği</option>
                                            <option value={20}>Dolma</option>
                                            <option value={21}>Balık</option>
                                            <option value={22}>Köfte</option>
                                            <option value={23}>Yoğurt / Ezme</option>
                                            <option value={24}>Komposto</option>
                                            <option value={25}>Tatlı</option>
                                            <option value={26}>Salata</option>
                                            <option value={27}>Meyve</option>
                                            <option value={28}>Börek</option>
                                            <option value={29}>Kıymalı Et Yemeği</option>
                                        </select>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="row mt-2">
                                            <div className='col-5'>
                                                <label htmlFor='kcal'>Kalori: </label>
                                            </div>
                                            <div className='col-7'>
                                                <input type="number" className="form-control" name="kcal" value={values.kcal} onChange={handleChange} onBlur={handleBlur} />
                                            </div>
                                        </div>


                                        <div className="row mt-2">
                                            <div className='col-5'>
                                                <label htmlFor="carb">Karbonhidrat: </label>
                                            </div>
                                            <div className='col-7'>
                                                <input type="number" className="form-control" name="carb" value={values.carb} onChange={handleChange} onBlur={handleBlur} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-6'>
                                        <div className="row mt-2">
                                            <div className='col-5'>
                                                <label htmlFor="protein">Protein: </label>
                                            </div>
                                            <div className='col-7'>
                                                <input type="number" className="form-control" name="protein" value={values.protein}  onChange={handleChange} onBlur={handleBlur}/>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className='col-5'>
                                                <label htmlFor="fat">Yağ: </label>
                                            </div>
                                            <div className='col-7'>
                                                <input type="number" className="form-control" name="fat" value={values.fat} onChange={handleChange} onBlur={handleBlur} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddFood}>
                        Kapat
                    </Button>
                    <Button type="submit" variant="primary"
                    // onClick={handlePostActivity}
                    >
                        Kaydet
                    </Button>
                </Modal.Footer>
                </form>
            </Modal>



            <Modal size='lg' show={showEditFoodModal} onHide={handleCloseEditFood} animation={false}>
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
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalFood.name} />
                            </div>
                        </div>



                        <div className="row mt-2">
                            <div className='col-3'>
                                <label for="exampleInputEmail1">Yemek grubu: </label>
                            </div>
                            <div className='col-9'>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalFood.group} />
                            </div>
                        </div>


                        <div className="row mt-2">
                            <div className='col-3'>
                                <label for="exampleInputEmail1">Yemek çeşidi: </label>
                            </div>
                            <div className='col-9'>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalFood.typeName} />
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-6'>
                                <div className="row mt-2">
                                    <div className='col-5'>
                                        <label for="exampleInputEmail1">Kalori: </label>
                                    </div>
                                    <div className='col-7'>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalFood.kcal} />
                                    </div>
                                </div>


                                <div className="row mt-2">
                                    <div className='col-5'>
                                        <label for="exampleInputEmail1">Karbonhidrat: </label>
                                    </div>
                                    <div className='col-7'>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalFood.carb} />
                                    </div>
                                </div>

                            </div>
                            <div className='col-6'>
                                <div className="row mt-2">
                                    <div className='col-5'>
                                        <label for="exampleInputEmail1">Protein: </label>
                                    </div>
                                    <div className='col-7'>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalFood.protein} />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className='col-5'>
                                        <label for="exampleInputEmail1">Yağ: </label>
                                    </div>
                                    <div className='col-7'>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={editModalFood.fat} />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditFood}>
                        Kapat
                    </Button>
                    <Button type="submit" variant="primary"
                    // onClick={handlePostActivity}
                    >
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>




            <Modal size='md' show={showDeleteFoodModal} onHide={handleCloseDeleteFood} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Yemek Silme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bu yemeği silmek istediğinize emin misiniz?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteFood}>
                        Kapat
                    </Button>
                    <Button type="submit" variant="danger"
                        onClick={handleDelete}
                    // onClick={handlePostActivity}
                    >
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>



            <div className='mb-5'>
                <h1 className="mb-5">Yemek Listesi</h1>


                <button className='btn btn-success' onClick={() => handleShowAddFood()}>Ekle</button>

                <table className="table table-striped mt-5 mb-5">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            <th scope="col">Yemek İsmi</th>
                            <th scope="col">Yemek Grubu</th>
                            <th scope="col">Yemek Çeşidi</th>
                            <th scope="col">Kalori</th>
                            <th scope="col">Karb.</th>
                            <th scope="col">Protein</th>
                            <th scope="col">Yağ</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {foods ? foods.map((food, index) => {
                            return (
                                <tr key={food.id}>
                                    <th>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.group}</td>
                                    <td>{food.typeName}</td>
                                    <td>{food.kcal}</td>
                                    <td>% {food.carb}</td>
                                    <td>% {food.protein}</td>
                                    <td>% {food.fat}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => createdAPIEndpoint(ENDPOINTS.FOOD + "/GetFood/").fetchById(food.id)
                                            .then(res => {
                                                let foodToBeEdited = res.data;
                                                console.log(res.data);
                                                handleShowEditFood()
                                                setEditModalFood(foodToBeEdited)
                                                // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                error("Yemek Bulunamadı", "");
                                            })}>
                                            <MdEdit />

                                        </button>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => handleShowDeleteFood(food.id)}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) : <h1>Yükleniyor...</h1>}




                        {/* <tr className='text-center'>
                            <th>1</th>
                            <td>Mercimek Çorbası</td>
                            <td>1</td>
                            <td>Çorba</td>
                            <td>128 kcal</td>
                            <td>%29</td>
                            <td>%38</td>
                            <td>%27</td>
                            <td className='text-end'>
                                <button className='btn btn-info' onClick={() => handleShowEditFood()}>
                                    <MdEdit />
                                </button>
                            </td>
                            <td className='text-start'>
                                <button className='btn btn-danger' onClick={() => handleShowDeleteFood()}>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr> */}
                        {/* {foods && foods.map((food, index) => {
                        return (
                            <tr key={food.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.foodName}</td>
                                <td>{food.kcal}</td>
                                <td>{food.carb == 0 ? " - " : food.carb + ` gr`}</td>
                                <td>{food.protein == 0 ? " - " : food.protein + ` gr`}</td>
                                <td>{food.fat == 0 ? " - " : food.fat + ` gr`}</td>
                                <td>{food.note}</td> 
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.FOOD).fetchById(food.id)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("Yemek Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.FOOD).delete(food.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'Yemek başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'Yemek silinemedi.')
                                        })} >
                                        <MdDelete style={{ color: 'red' }} size={22} />
                                    </a>
                                </td>
                            </tr>
                        )
                    })} */}
                    </tbody>
                </table>

            </div>


        </>


    )
}

export default YemekListesi
