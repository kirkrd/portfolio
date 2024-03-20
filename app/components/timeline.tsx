export interface JobItem {
  company: string;
  monthYear: string;
  jobTitle: string;
  jobDescription: string;
  consultantCompany?: string;
}

const Job = ({
  monthYear,
  company,
  jobTitle,
  jobDescription,
  consultantCompany,
}: JobItem) => {
  return (
    <li className="mb-10 ms-4">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {monthYear}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {jobTitle} - {company}
      </h3>
      {consultantCompany && (
        <h4 className="text-md font-semibold text-gray-400 dark:text-gray-600">
          {consultantCompany}
        </h4>
      )}
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {jobDescription}
      </p>
    </li>
  );
};

interface Props {
  jobs: JobItem[];
}

const Timeline = ({ jobs }: Props) => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {jobs.map((job) => (
        <Job key={job.jobTitle} {...job} />
      ))}
    </ol>
  );
};

export default Timeline;
