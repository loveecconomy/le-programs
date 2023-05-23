/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Text
} from "@chakra-ui/react";
import { IBusRound } from "@/interface/bus";

export default function DeleteBusRound({isOpen, onClose, bus}: {isOpen: boolean, onClose: () => void; bus: IBusRound}) {
    const cancelRef = React.useRef(null)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    const [loading, setLoading] = useState(false)

    const deleteBus = async () => {
        setLoading(true)
         await fetch(`${baseUrl}/api/bus_rounds`, {
            method: 'delete'
        })
        .then(() => deleteBus())
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }


    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Bus
                </AlertDialogHeader>

                <AlertDialogBody>
                    <Text>Bus was created by <Text as="span" textTransform={"capitalize"} fontWeight={600}>{bus?.busRep}</Text></Text>
                    <Text>Are you sure? You can&lsquo;t undo this action afterwards.</Text>
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={() => {
                   deleteBus()
                }} ml={3} 
                isLoading={loading}>
                    Delete
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}