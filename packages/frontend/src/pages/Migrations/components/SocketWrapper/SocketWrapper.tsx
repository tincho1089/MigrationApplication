import { getMigrationsAdapter } from '@/adapters'
import { Endpoints } from '@/models'
import { ApiMigration, newMigration } from '@/models/migration.model'
import { listMigrations } from '@/redux/states/migration'
import { AppStore } from '@/redux/store'
import { SnackbarUtilities } from '@/utilities'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io, { Socket } from 'socket.io-client'
import { CustomProvider } from '../../context'

export interface SocketWrapperInterface {
  children: React.ReactNode
}

const SocketWrapper: React.FC<SocketWrapperInterface> = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const migrationState = useSelector((store: AppStore) => store.migration)
  const dispatch = useDispatch()

  const send = (migration: newMigration) => {
    socket?.emit('message', migration)
  }

  const messageListener = (message: ApiMigration) => {
    const newMigration = getMigrationsAdapter([message])
    dispatch(listMigrations([...migrationState, ...newMigration]))
    SnackbarUtilities.success(`A new migration for the specie ${message.species} has been created!`)
  }

  useEffect(() => {
    const newSocket = io(Endpoints.socketConn)
    setSocket(newSocket)
  }, [setSocket])

  useEffect(() => {
    socket?.on('message_new_migration', messageListener)
    return () => {
      socket?.off('message_new_migration', messageListener)
    }
  }, [messageListener])

  return <CustomProvider emitMessage={send}>{children}</CustomProvider>
}

export default SocketWrapper
