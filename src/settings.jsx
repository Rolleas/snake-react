import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {useEffect} from "react";

export const SettingsPage = ({ settings, setGameEnd, setSettings, setGameStart }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        onOpen();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: value,
        }));
    };


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Настройки игры</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Имя"
                                name="playerName"
                                value={settings.playerName}
                                onChange={handleChange}
                            />
                            <Input
                                label="Цвет змейки"
                                type="color"
                                name="snakeColor"
                                value={settings.snakeColor}
                                onChange={handleChange}
                            />
                            <Input
                                label="Цвет еды"
                                type="color"
                                name="foodColor"
                                value={settings.foodColor}
                                onChange={handleChange}
                            />
                            <Input
                                label="Размер поля"
                                type="number"
                                max={50}
                                min={10}
                                name="boardSize"
                                value={settings.boardSize}
                                onChange={handleChange}
                            />
                            <Input
                                label="Скорость игры"
                                type="range"
                                name="gameSpeed"
                                min="50"
                                max="200"
                                value={settings.gameSpeed}
                                onChange={handleChange}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onPress={() => {
                                setGameStart(true)
                                setGameEnd(false);
                            }}>
                                начать игру
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}