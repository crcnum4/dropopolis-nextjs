import React, {FC, Fragment} from 'react';

type ContainerProps = {
  children: React.ReactNode,
  style?: React.CSSProperties,
  error?: string,
  className?: string,
  errorClassName?: string,
}

const InlineInputContainer: FC<ContainerProps> = (props) => {
  return (
    <Fragment>
      {props.error ? <p style={styles.error}>{props.error}</p> : null}
      <div style={{...styles.container, ...props.style}}>
        {props.children}
      </div>
    </Fragment>
  )
}

type Styles = {
  container: React.CSSProperties,
  error: React.CSSProperties,
}

const styles: Styles = {
  container: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minWidth: '200px',
    borderRadius: '5px',
    overflow: 'hidden',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    margin: "0px 0px 2px 0px",
  }
}

export default InlineInputContainer