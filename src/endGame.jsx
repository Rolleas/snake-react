import {
    Button, Code,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {useEffect} from "react";

export const EndGame = ({score, setScore, settings, setGameEnd, setGameStart}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        onOpen();
    }, [])


    return (
        <Modal closeButton={false} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Настройки игры</ModalHeader>
                        <ModalBody>
                            <p>Игрок</p>
                            <Code color="primary">{settings.playerName}</Code>
                            <p>Счет</p>
                            <Code color="warning"> {score}</Code>
                        </ModalBody>
                        <ModalFooter className="justify-center">
                            <Button color="success" className="w-full" onPress={() => {
                                setGameEnd(false);
                                setGameStart(false);
                                setScore(0);
                            }}>Далее</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}