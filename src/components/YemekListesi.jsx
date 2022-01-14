import React, { useEffect, useState } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik'

function YemekListesi() {

    const [showAddFoodModal, setShowAddFoodModal] = useState(false);
    const [showEditFoodModal, setShowEditFoodModal] = useState(false);
    const [showDeleteFoodModal, setShowDeleteFoodModal] = useState(false);

    const handleShowAddFood = () => setShowAddFoodModal(true);
    const handleCloseAddFood = () => {
        // values.gram = "";
        // values.timeOfTheDay = "";
        setShowAddFoodModal(false);
    }


    const handleShowEditFood = () => setShowEditFoodModal(true);
    const handleCloseEditFood = () => {
        // values.gram = "";
        // values.timeOfTheDay = "";
        setShowEditFoodModal(false);
    }


    const handleShowDeleteFood = () => setShowDeleteFoodModal(true);
    const handleCloseDeleteFood = () => {
        // values.gram = "";
        // values.timeOfTheDay = "";
        setShowDeleteFoodModal(false);
    }




    return (


        <>
            <Modal size='lg' show={showAddFoodModal} onHide={handleCloseAddFood} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Yemek Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>sdklghjskghjskdghjsdhgj</h1>
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
            </Modal>



            <Modal size='md' show={showEditFoodModal} onHide={handleCloseEditFood} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Yemek Düzenleme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Yemek Düzenleme</h1>
                    <p>Yemek İsmi</p>
                    <p>Yemek Grubu</p>
                    <p>Yemek Çeşidi</p>
                    <p>Kalori</p>
                    <p>Karb.</p>
                    <p>Protein</p>
                    <p>Yağ</p>
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
                        <tr className='text-center'>
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
                        </tr>

                        <tr className='text-center'>
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
                        </tr>

                        <tr className='text-center'>
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
                        </tr>

                        <tr className='text-center'>
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
                        </tr>
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
