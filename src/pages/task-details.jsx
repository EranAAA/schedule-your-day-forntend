import React, { useState, useEffect } from 'react'
import { useOutletContext, useParams, useNavigate } from "react-router-dom"

import { ColorSwitches } from "../cmps/mui-templats/switch"
import { utilService } from '../services/util.service'

import { DialogSelect } from '../cmps/mui-templats/select-dialog'

export const TaskDetails = () => {

   const [task, setTask] = useState('')
   const { schedule, updateTask, removeTask } = useOutletContext()
   const navigate = useNavigate();
   const { taskId } = useParams();

   useEffect(() => {
      if (!schedule?.tasks) navigate(-1)
      if (schedule?.tasks) setTask(schedule.tasks.find(task => task.id === taskId))
   }, [])

   const onClose = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();

      navigate(-1)
   }

   const dateTemplate = () => {
      const { days, hours } = utilService.getTimeFormatted(task.date)
      let display = ''
      if (days[0] === days[1]) display = `${days[0].substring(0,3) } At ${hours[0]} To ${hours[1]} `
      else display = `${days[0].substring(0,3) } - ${days[1].substring(0,3) } At ${hours[0]} - ${hours[1]} `
      return display
   }

   const handleChange = ({ target }) => {
      if (target.value === task.description) return
      setTask({ ...task, description: target.value })
   }

   const onUpdateTaskOnBlur = (ev) => {
      ev.preventDefault();
      updateTask(task)
   }

   const onPickColorBgc = (color) => {
      const updateTaskBgc = { ...task }
      if (color === 'strip-horizental' || color === 'strip-diagonal') {
         updateTaskBgc.styles.stripStyle = color
      }
      else if (color === 'none') {
         updateTaskBgc.styles.stripStyle = ''
      }
      else {
         updateTaskBgc.styles.backgroundColor = color
      }
      updateTask(updateTaskBgc)
   }

   const onPickColor = (color) => {
      const updateTaskColor = { ...task }
      updateTaskColor.styles.color = color
      updateTask(updateTaskColor)
   }

   const onPickFontSize = (fontSize) => {
      const updateTaskFontSize = { ...task }
      updateTaskFontSize.styles.fontSize = fontSize
      updateTask(updateTaskFontSize)
   }

   const onRemoveTask = () => {
      removeTask(task.id)
      navigate(-1)
   }

   const backgroundDisplay = () => {
      if (task.styles.stripStyle === 'strip-diagonal') {
         return {
            backgroundImage: '-webkit-repeating-linear-gradient(45deg, transparent,transparent 8px, rgba(255,255,255,.5) 10px, rgba(255,255,255,.5) 18px)',
            backgroundSize: 'unset'
         }
      } else if (task.styles.stripStyle === 'strip-horizental') {
         return {
            backgroundImage: `linear-gradient(rgba(255, 255, 255, .6) 50%, transparent 50%, transparent)`,
            backgroundSize: '50px 16px'
         }
      } else {
         return {
            backgroundImage: `unset`,
            backgroundSize: 'unset'
         }
      }
   }

   if (!task) return

   return (
      <main className='task-details' >
         <div className="details-contianer" >
            <button className="close-btn" onClick={onClose}>X</button>
            <div className="title" style={
               {
                  backgroundImage: `${backgroundDisplay().backgroundImage} `,
                  backgroundSize: `${backgroundDisplay().backgroundSize}`,
                  backgroundColor: `${task.styles.backgroundColor}`,
                  color: `${task.styles.color}`,

               }}>{task.title}</div>

            <div className="schedule-container">
               <p >Schedule</p>
               <div className="schedule">
                  {dateTemplate()}
                  <DialogSelect task={task}/>
               </div>
               <div className="important-container">
                  Important <ColorSwitches updateTask={updateTask} task={task} />
               </div>
            </div>

            <div className="description-container">
               <p>Description</p>
               <textarea className='description' onBlur={onUpdateTaskOnBlur} onChange={handleChange} /*onKeyDown={onUpdateTaskOnEnter}*/ value={task.description}></textarea>
            </div>

            <div className="bgc-container">
               <p>Background</p>
               <div className="color">
                  <button onClick={() => onPickColorBgc('#7BC86C')} style={{ backgroundColor: `#7BC86C` }}></button>
                  <button onClick={() => onPickColorBgc('#F5DD29')} style={{ backgroundColor: `#F5DD29` }}></button>
                  <button onClick={() => onPickColorBgc('#FFAF3F')} style={{ backgroundColor: `#FFAF3F` }}></button>
                  <button onClick={() => onPickColorBgc('#EF7564')} style={{ backgroundColor: `#EF7564` }}></button>
                  <button onClick={() => onPickColorBgc('#CD8DE5')} style={{ backgroundColor: `#CD8DE5` }}></button>
                  <button onClick={() => onPickColorBgc('#5BA4CF')} style={{ backgroundColor: `#5BA4CF` }}></button>
                  <button onClick={() => onPickColorBgc('#29CCE5')} style={{ backgroundColor: `#29CCE5` }}></button>
                  <button onClick={() => onPickColorBgc('#6DECA9')} style={{ backgroundColor: `#6DECA9` }}></button>
                  <button onClick={() => onPickColorBgc('#FF8ED4')} style={{ backgroundColor: `#FF8ED4` }}></button>
               </div>
            </div>

            <div className="bgc-container">
               <p>Style</p>
               <div className="color">
                  <button onClick={() => onPickColorBgc('strip-horizental')}
                     style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent)',
                        backgroundSize: '50px 16px',
                        backgroundColor: `${task.styles.backgroundColor}`
                     }}>
                  </button>
                  <button onClick={() => onPickColorBgc('strip-diagonal')}
                     style={{
                        backgroundImage: '-webkit-repeating-linear-gradient(45deg, transparent,transparent 8px, rgba(255,255,255,.5) 10px, rgba(255,255,255,.5) 18px)',
                        backgroundColor: `${task.styles.backgroundColor}`
                     }}>
                  </button>
                  <button onClick={() => onPickColorBgc('none')} style={{ backgroundColor: `#FFF` }}>None</button>
               </div>
            </div>

            <div className="bgc-container">
               <p>Font Color <span>(on title only)</span></p>
               <div className="color">
                  <button onClick={() => onPickColor('#121212')} style={{ backgroundColor: `#121212` }}></button>
                  <button onClick={() => onPickColor('#1B2430')} style={{ backgroundColor: `#1B2430` }}></button>
                  <button onClick={() => onPickColor('#06283D')} style={{ backgroundColor: `#06283D` }}></button>
                  <button onClick={() => onPickColor('#1363DF')} style={{ backgroundColor: `#1363DF` }}></button>
                  <button onClick={() => onPickColor('#FFFFFF')} style={{ backgroundColor: `#FFFFFF` }}>White</button>
                  
               </div>
            </div>
            <div className="bgc-container">
               <p>Font Size <span>(on title on board only)</span></p>
               <div className="btn-pixel-container">
                  <button className="btn-pixel" onClick={() => onPickFontSize(Number(task.styles.fontSize ? task.styles.fontSize : '13')-1)} >-</button>
                     <div className="font-size">{task.styles.fontSize ? task.styles.fontSize : '13'}px</div>
                  <button className="btn-pixel" onClick={() => onPickFontSize(Number(task.styles.fontSize ? task.styles.fontSize : '13')+1)} >+</button>

               </div>
            </div>

            <div className="remove-container">
               <div className="remove-btn" onClick={onRemoveTask}>Remove</div>
            </div>
         </div>

      </main>
   )
}
