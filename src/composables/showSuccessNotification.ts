import useNotification from '@/components/ui/ksNotification/useNotification'

export default message => {
  useNotification.addNotification({
    title: 'موفق!',
    text: message,
    color: 'success',
    duration: 4000
  })
}
