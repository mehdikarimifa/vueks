import useNotification from '@/components/ui/ksNotification/useNotification'

export default message => {
  useNotification.addNotification({
    title: 'هشدار!',
    text: message,
    color: 'warn'
  })
}
