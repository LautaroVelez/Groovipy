import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/modal";
import {useDisclosure} from "@nextui-org/react";
import Image from "next/image";

const ModalImg = ({imgProps,isOpen}) => {

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                  <img src={imgProps} alt={'ImgArtist'} width={'auto'} height={'auto'}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default ModalImg