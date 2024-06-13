import { CustomButton } from '@/components'
import { sharingInformationService } from '@/utilities'

function NewMigrationButton() {
  const handleClick = () => {
    sharingInformationService.setSubject(true)
  }

  return <CustomButton onClick={handleClick}>New Migration </CustomButton>
}
export default NewMigrationButton
