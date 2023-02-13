import useNotification from '@/components/ui/ksNotification/useNotification'

export default message => {
  useNotification.addNotification({
    title: 'خطا!',
    text: message,
    color: 'danger'
  })
}
