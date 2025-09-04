
import { useState } from 'react';

import { Accordion, AccordionItem, Button, Card, CardBody, Popover, PopoverContent, PopoverTrigger, Slider } from '@nextui-org/react';
import { useModelStore } from '../model/Model';
import VisualWritingInterface from '../view/VisualWritingInterface';
import ReadingInterface from './ReadingInterface';
import { ReadingStudyTaskGenerator } from './ReadingStudyTaskGenerator';
import StudyMessage from './StudyMessage';
import { useStudyStore } from './StudyModel';
import StudyVideo from './StudyVideo';
import { WritingStudyTaskGenerator } from './WritingStudyTaskGenerator';



export default function StudyInterface() {
  const nextStep = useStudyStore(state => state.nextStep);
  const [showSlider, setShowSlider] = useState(false);
  let participantId = useStudyStore(state => state.participantId);
  let steps = useStudyStore(state => state.steps);
  let stepId = useStudyStore(state => state.stepId);
  const setSteps = useStudyStore(state => state.setSteps);
  const setParticipantId = useStudyStore(state => state.setParticipantId);
  const setStepId = useStudyStore(state => state.setStepId);
  const setStudyType = useStudyStore(state => state.setStudyType);
  const setIsReadOnly = useModelStore(state => state.setIsReadOnly);
  const isReadOnly = useModelStore(state => state.isReadOnly);
  const [instructionIndex, setInstructionIndex] = useState(0);
  const isOutOfTime = useStudyStore(state => state.isOutOfTime);
  const [sliderValue, setSliderValue] = useState(-1);
  const [resetButtonTimestamp, setResetButtonTimestamp] = useState(0);
  const [resetPopoverEnabled, setResetPopoverEnabled] = useState(false);


  // Use URL parameters to generate the steps
  const hashSplitted = window.location.hash.split("?");
  const search = hashSplitted[hashSplitted.length-1]
  const params = new URLSearchParams(search);
  const pid = params.get('pid');
  const pstepId = params.get('stepId');
  const studyType = params.get('studyType');

  if (participantId === -1 && pid) {
    // @ts-ignore
    window["model"] = useModelStore;
    setParticipantId(participantId = parseInt(pid))
    setStudyType(studyType === "READING" ? "READING" : "WRITING");
    console.log("Study type: ", studyType);
    if (studyType === "WRITING") {
      setSteps(WritingStudyTaskGenerator.generateSteps(participantId))
      setIsReadOnly(false);
    } else {
      setSteps(ReadingStudyTaskGenerator.generateSteps(participantId))
      setIsReadOnly(true);
    }
    
    // In case of failure, we allow jumping to a specific step directly
    if (pstepId) {
      setStepId(stepId = parseInt(pstepId));
    } else {
      setStepId(stepId = 0);
    }
  }

  const currentStep = steps[stepId];

  if (participantId < 0 || !currentStep) {
    return <StudyMessage content="Error: Make sure the URL is correct." />
  }

  if (currentStep.type === "MESSAGE") {
    return (
      <StudyMessage content={currentStep.message!} showNextButton={stepId + 1 < steps.length} />
    )
  } else if (currentStep.type === "VIDEO") {
    return <StudyVideo video={currentStep.message!} />
  }

  const instructionCard = (<div style={{ position: 'absolute', left: 10, bottom: isReadOnly ? 10 : 60, userSelect: 'none', zIndex: 99999 }}>
    <Card style={{ width: 350 }}>
      <CardBody>
        <Accordion isCompact defaultExpandedKeys={["1"]}>
          <AccordionItem key="1" aria-label="Accordion 1" title="Instructions" style={{whiteSpace: 'pre-wrap'}}>
            {currentStep.instructions![instructionIndex]}
          </AccordionItem>
        </Accordion>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Popover isOpen={resetPopoverEnabled} onClose={() => setResetPopoverEnabled(false)}>
            <PopoverTrigger>
              <Button variant={"light"} onPressStart={(e) => {
                setResetButtonTimestamp(new Date().getTime());
              }}

              onPressEnd={(e) => {
                if (new Date().getTime() - resetButtonTimestamp > 1000) {
                  useStudyStore.getState().logEvent("RESET_PRESSED");
                  useStudyStore.getState().resetStep();
                } else {
                  setResetPopoverEnabled(true);
                }
              }}
              
              >Reset</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>Press for at least 1 second</p>
            </PopoverContent>
          </Popover>
          <Button color={isOutOfTime ? "danger" : undefined} style={{ flexGrow: 5 }} onClick={(e) => {
            useStudyStore.getState().logEvent("NEXT_PRESSED");
            if (instructionIndex + 1 < currentStep.instructions!.length) {
              useStudyStore.getState().logEvent("SUBTASK_COMPLETED"/*, { finalState: useModelStore.getState(), text: document.getElementById("mainTextField")?.innerText }*/);
              setInstructionIndex(instructionIndex + 1);
            } else {
              useStudyStore.getState().logEvent("TASK_COMPLETED"/*, { finalState: useModelStore.getState(), text: document.getElementById("mainTextField")?.innerText }*/);
              setInstructionIndex(0);
              nextStep();
            }
          }}>Next</Button>
        </div>
      </CardBody>
    </Card>
  </div>)


if (currentStep.condition === "BASELINE") {
    return (
      <>
        <ReadingInterface>
          {instructionCard}
        </ReadingInterface>
      </>
    )
} 

  return (
    <>
      <VisualWritingInterface>
        {instructionCard}
      </VisualWritingInterface>
    </>
  )
}
