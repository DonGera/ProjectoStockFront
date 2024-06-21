import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const buildNewProductInfo = () => ({
    name: '',
    category: '',
    quantity: '',
    unitPrice: '',
    description: ''
});

const ProductModal = ({
    show,
    productToUpdateInfo,
    isCreate,
    handleAddProductClick,
    handleUpdateProductClick,
    handleCancelClick
}) => {
    const [currentProductInfo, setCurrentProductInfo] = useState({});
    const [shouldValidate, setShouldValidate] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        if (show) {
            if (isCreate) {
                const newProductBarebone = buildNewProductInfo();
                setCurrentProductInfo(newProductBarebone);
            } else {
                setCurrentProductInfo(productToUpdateInfo)
            }
        }

    }, [show]);

    useEffect(() => {
        if (formRef.current) {
            setIsValidated(formRef.current.checkValidity());
        }

    }, [currentProductInfo]);

    const handleProductInputFieldChange = (event, fieldName) => {
        if (fieldName !== 'description') {
            setShouldValidate(true)
        }

            setCurrentProductInfo({
                ...currentProductInfo,
                [fieldName]: event.target.value
            })
    
    }

    const handleSave = (event) => {
        if (isValidated) {
            if (isCreate) {
                handleAddProductClick(currentProductInfo);
            } else {
                handleUpdateProductClick(currentProductInfo);
            }

            clearState();
        }
    };

    const handleCancel = (event) => {
        handleCancelClick();

        clearState();
    };

    const clearState = () => {
        setShouldValidate(false)
        setIsValidated(false);
        setCurrentProductInfo({});
    }

    return (
        <>
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{isCreate ? 'Agregar Producto' : 'Modificar Producto'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} noValidate validated={shouldValidate}>
                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                defaultValue={currentProductInfo.name}
                                type="text"
                                placeholder=""
                                onChange={(e) => handleProductInputFieldChange(e, 'name')}
                                required
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, ingrese el nombre
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                defaultValue={currentProductInfo.category}
                                type="text"
                                placeholder=""
                                required
                                onChange={(e) => handleProductInputFieldChange(e, 'category')}
                            />
                            <Form.Control.Feedback>Muy bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Tiene que ingresar una categoria
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                defaultValue={currentProductInfo.quantity}
                                type="number"
                                placeholder=""
                                required
                                onChange={(e) => handleProductInputFieldChange(e, 'quantity')}
                            />
                            <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Cuantos productos hay en stock?
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                defaultValue={currentProductInfo.unitPrice}
                                type="number"
                                placeholder=""
                                required
                                onChange={(e) => handleProductInputFieldChange(e, 'unitPrice')}
                            />
                            <Form.Control.Feedback>Genial!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Falta el precio!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput1">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                defaultValue={currentProductInfo.description}
                                type="text"
                                placeholder=""
                                onChange={(e) => handleProductInputFieldChange( e, 'description')}
                            />
                        </Form.Group>

                        {
                            !isCreate &&
                            <Form.Group className="mb-3" controlId="ControlInput1">
                                <Form.Label>Ultima Modificacion</Form.Label>
                                <Form.Control
                                    defaultValue={currentProductInfo.lastCheckDate}
                                    type="text"
                                    placeholder=""
                                    disabled
                                />
                            </Form.Group>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={!isValidated}
                    >
                        {isCreate ? 'Agregar' : 'Modificar'}
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductModal;