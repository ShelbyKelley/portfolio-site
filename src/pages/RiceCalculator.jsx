import RiceCalculatorTool from '../components/RiceCalculatorTool'

import ProjectPage from './ProjectPage'

function RiceCalculator() {
  return (
    <ProjectPage title="RICE Prioritization Calculator">
      <p>
        RICE is a framework for ranking competing feature ideas by expected
        value rather than gut feeling. Enter a few ideas below and this tool
        ranks them automatically.
      </p>

      <section>
        <h2 className="font-heading text-xl font-semibold text-heading mb-2">
          The formula
        </h2>
        <p>
          Score equals Reach times Impact times Confidence, divided by Effort.
        </p>
        <p>
          A higher score means a stronger case for prioritizing that idea now.
          The score is only as good as the estimates behind it, so it works best
          as a starting point for discussion, not a final answer.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-heading mb-2">
          What each field means
        </h2>
        <ul className="list-disc list-outside pl-5 space-y-2">
          <li>
            <span className="font-medium text-heading">Reach</span>: how many
            people or customers this affects in a given period, for example per
            quarter. A higher number means more people touched.
          </li>
          <li>
            <span className="font-medium text-heading">Impact</span>: how much
            this moves the needle for each person it reaches. Enter 3 for
            massive impact, 2 for high, or 1 for medium.
          </li>
          <li>
            <span className="font-medium text-heading">Confidence</span>: how
            sure you are about your Reach and Impact estimates, entered as a
            percentage. Use 100 when you have solid data behind an estimate and
            lower it when you are mostly guessing.
          </li>
          <li>
            <span className="font-medium text-heading">Effort</span>: the
            estimated cost to build it, in person-weeks. A larger number pulls
            the score down, since bigger efforts need a stronger case to
            justify.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-heading mb-2">
          How to use it
        </h2>
        <p>
          Add every idea you are weighing, even rough ones. The ranked list
          below shows where to focus first given your current estimates. Revisit
          the numbers as you learn more. A low confidence score today is a
          reason to go find better data, not a reason to ignore the idea.
        </p>
      </section>

      <RiceCalculatorTool />
    </ProjectPage>
  )
}

export default RiceCalculator
